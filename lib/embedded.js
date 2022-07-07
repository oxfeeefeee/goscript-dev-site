export function getEmbedded() {
    return {
        "template.go": template,
        "fibonacci.go": fibonacci,
        "leetcode5.go": leetcode5,
        "list.go": list,
        "closure.go": closure,
        "unicode.go": unicode,
    };
}

let template = `package main

//import "fmt"

func main() {
	// click here and start typing!
}
`


const fibonacci = `package main

import "fmt"

func fibonacci(c, quit chan int) {
	x, y := 0, 1
	for {
		select {
		case c <- x:
			x, y = y, x+y
		case <-quit:
			fmt.Println("quit")
			return
		}
	}
}

func main() {
	c := make(chan int)
	quit := make(chan int)
	go func() {
		for i := 0; i < 12; i++ {
			fmt.Println(<-c)
		}
		quit <- 0
	}()

	fibonacci(c, quit)
}
`

const leetcode5 = `package main

import "fmt"

func longestPalindrome(s string) string {
	if len(s) <= 1 {
		return s
	}
	table := make([][]bool, len(s))
	for i := 0; i < len(table); i++ {
		table[i] = make([]bool, len(s))
	}

	b := 0
	e := 1
	for l := 0; l < len(s); l++ {
		for i := 0; i < len(s)-l; i++ {
			j := i + l
			if l == 0 {
				table[i][j] = true
			} else if l == 1 {
				table[i][j] = s[i] == s[j]
			} else {
				table[i][j] = table[i+1][j-1] && (s[i] == s[j])
			}
			if table[i][j] {
				b, e = i, j
			}
		}
	}
	return s[b : e+1]
}

func longestPalindrome2(s string) string {
	if len(s) <= 1 {
		return s
	}
	table := make([][]int, len(s))
	for i := 0; i < len(table); i++ {
		table[i] = make([]int, len(s))
	}
	var res string
	max := 0
	for i, _ := range s {
		for j := i; j > -1; j-- {
			if s[i] == s[j] && (i-j < 2 || table[i-1][j+1] != 0) {
				table[i][j] = 1
			}

			if table[i][j] != 0 && (i-j+1) > max {
				max = i - j + 1
				res = s[j : i+1]
			}
		}
	}
	return res
}

func main() {
	s := "ZnVuYyBsb25nZXN0UGFsaW5kcm9tZShzIHN0cmaabbaabbaabbluZykgc3RyaW5nIHsKICAgIGlmIGxlbihzKSA8PSAxIHsKICAgICAgICByZXR1cm4gcwogICAgfQogICAgCiAgICB0YWJsZSA6PaaabbbaaabbbaaaSBtYWtlKFtdW11ib29"
	for i := 0; i < 0; i++ {
		s = s + s
	}

	fmt.Println(len(s))
	result := longestPalindrome2(s)
	assert(result == "aaabbbaaabbbaaa")
}
`

const list = `package main

import "fmt"

type Node struct {
	prev *Node
	next *Node
	key  interface{}
}

type List struct {
	head *Node
	tail *Node
	t1   *Node
	t2   *Node
}

var glist = List{}

func (L *List) Insert(key interface{}) {
	list := &Node{
		next: L.head,
		key:  key,
	}
	if L.head != nil {
		L.head.prev = list
	}
	L.head = list

	l := L.head
	for l.next != nil {
		l = l.next
	}
	L.tail = l
}

func (l *List) Display() {
	list := l.head
	for list != nil {
		fmt.Println("%+v ->", list.key)
		list = list.next
	}
	//fmt.Println()
}

func Display(list *Node) {
	for list != nil {
		fmt.Println("%v ->", list.key)
		list = list.next
	}
	//fmt.Println()
}

func ShowBackwards(list *Node) {
	for list != nil {
		fmt.Println("%v <-", list.key)
		list = list.prev
	}
	//fmt.Println()
}

func (l *List) Reverse() {
	curr := l.head
	var prev *Node
	l.tail = l.head

	for curr != nil {
		next := curr.next
		curr.next = prev
		prev = curr
		curr = next
	}
	l.head = prev
	Display(l.head)
}

func main() {

	link := List{}
	link.Insert(1)
	link.Insert(3)
	link.Insert(5)
	link.Insert(7)
	link.Insert(9)

	fmt.Println("\\n==============================\\n")
	fmt.Println("Head: %v\\n", link.head.key)
	fmt.Println("Tail: %v\\n", link.tail.key)
	//fmt.Println("ttt: %v\\n", link.ttt.key)
	link.Display()
	fmt.Println("\\n==============================\\n")
	fmt.Println("head: %v\\n", link.head.key)
	fmt.Println("tail: %v\\n", link.tail.key)
	link.Reverse()
	fmt.Println("\\n==============================\\n")

	// for testing GC
	link2 := List{}
	link2.Insert(10)
	link2.Insert(30)
	link2.Insert(50)
	link2.Insert(70)
	link2.Insert(90)
	link2.head.prev = link2.tail
	link2.tail.next = link2.head
	glist.Insert(2)
	glist.Insert(4)
	glist.Insert(6)
	glist.Insert(8)
	glist.Insert(10)
	glist.t1 = glist.head
	glist.t2 = glist.head

}
`

const closure = `package main

import "fmt"

func main() {
    a := 44
    b := func() func() int {
        c := 3
        return func()int {
            d := 2
			return a + 1 + c + d
        }
    }
    e := func() int {
        c := b()() + 10
        return c + a
    }
    f := e()
    assert(f == 104)
    fmt.Println(f)
}
`

const unicode = `package main

import (
	"fmt"
    "unicode/utf8"
)

func ExampleDecodeLastRune() {
	b := []byte("Hello, 世界")
	utf8.DecodeLastRune(b)

	
	for len(b) > 0 {
		r, size := utf8.DecodeLastRune(b)
		fmt.Printf("%c %v\\n", r, size)

		b = b[:len(b)-size]
	}
	
	// Output:
	// 界 3
	// 世 3
	//   1
	// , 1
	// o 1
	// l 1
	// l 1
	// e 1
	// H 1
}


func main() {
    ExampleDecodeLastRune()
	fmt.Println("a \\n b👌")
}`

