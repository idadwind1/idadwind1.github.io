---
layout: default
---

# 伪代码

> 伪代码（Pseudocode）是一种类似于代码的语法，用于向人类表明某些代码语法是如何工作的，或者说明某项代码结构的设计。它是一种算法描述语言，使之可用于任何编程语言实现。伪代码必须结构清晰，代码简单，可读性好，并且类似自然语言。

伪代码拥有基础编程语言的一些要素：
- 循环 *(for、for-each、while、do-while等)*

- 分支 *(if、switch等)*

- 数据类型 *(整数、字符串、布尔等)*

- 函数、类定义

- 注意：伪代码的语法是可以人造的，没有严格的要求，只要人能看懂就行了

  一般伪代码的语法与需要转换成的语言/编写者常用的语言有关系

举例：

```text
input: a
randomize: b
while true
	if a < b
         print: 小了
     else if a > b
         print: 大了
     else
		print: 你赢了！
		break
    end if
end while
```

在这份伪代码中，赋值和传参的语法都是`:`；同时while和if都以end结尾，类似[BASIC]([BASIC - Wikipedia](https://en.wikipedia.org/wiki/BASIC))语言