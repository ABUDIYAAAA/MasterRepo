# 1

num = int(input("Please enter a number: "))

if num % 2 == 0:
    print(num, 'is a even number')
else:
    print(num, 'is a odd number')


# 2

num = int(input("Please enter number 1: "))
num2 = int(input("Please enter number 2: "))
num3 = int(input("Please enter number 3: "))

if num > num2 and num > num3:
    print(num, "is the largest number")
elif num2 > num and num2 > num3:
    print(num2, "is the largest number")
else:
    print(num3, "is the largest number")

# 3

num = int(input("Please enter number: "))
if num < 1:
    print(num, 'is not a prime')
else:
    for i in range(2, num):
        if num % i == 0:
            print(num, 'is not a prime')
            break
        else:
            print(num, 'is prime')
            break

# 4

num= int(input("please enter number: "))
n = int(input("please enter the position you want the table till: "))

for i in range(1, n+1):
    print(num, "x", i, '=', num*i)

# 5

n = int(input("Please enter number: "))

result = 0 

for i in range(0, n+1):
    result = result + i

print(result)

# 6

string1 = input("Please enter your string: ")
print(string1, "is", len(string1), "character(s) long")

# 7
n = int(input("How many digits do you want to enter? \n"))

nums = []
even_nums = []

if n >= 1:
    for i in range(1, n+1):
        num = int(input(f"please enter number {i}: "))
        nums.append(num)
    for j in range(0, n):
        if nums[j] % 2 == 0:
            even_nums.append(nums[j])
    print(even_nums)
elif n == 0:
    print("[0]")
else: 
    print("no even nos.")

# 8

age = int(input("please enter your age: "))

if age >= 18:
    print("you can vote")
else:
    print("you cannot vote")

# 9
n = int(input("How many digits do you want to enter? \n"))

nums = []
reversed_nums = []

if n >= 1:
    for i in range(1, n+1):
        num = int(input(f"please enter number {i}: "))
        nums.append(num)
    for j in range(1, n+1):
       reversed_nums.append(nums[-j])
    print(reversed_nums)

# 10

for i in range(1, 6):
    print(i*i)

# 11

num = int(input("Please enter the number you want the factorial of: "))
result = 1

if num >= 1:
    for i in range(1, num+1):
        result = result * i

    print(result)
elif num == 0:
    print(1)
else:
    print("-ve numbers dont have facotrials")

#  12
n = int(input("Please enter the place you want the series till: "))
n1, n2 = 0, 1
count = 0
if n == 1:
    print("Fibonacci sequence upto ", n, ":")
    print(n1)
else:
    print("Fibonacci sequence upto ", n, ":")
    while count < n:
        print(n1)
        nth = n1 + n2
        n1 = n2
        n2 = nth
        count += 1
