#Python recruitement task 


''' Create good script to create new list, which only contains users from Poland. Try to do it 
with List Comprehension. '''


users = [{"name": "Kamil", "country":"Poland"}, {"name":"John", "country": "USA"}, {"name": 
"Yeti"}]

def selecting_users_from_Poland(list):   
    return [x for x in list if x.get('country') == 'Poland']

print(selecting_users_from_Poland(users))

'''Display sum of first ten elements starting from element 5:'''

numbers = [1,5,2,3,1,4,1,23,12,2,3,1,2,31,23,1,2,3,1,23,1,2,3,123]

def sum_of_first_10(list):
    return sum(list[4:14])

print(sum_of_first_10(numbers))

'''Fill list with powers of 2, n [1..20]'''

normal_list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]


def fill_list_with_powers(list):
    return [x**2 for x in list]

print(fill_list_with_powers(normal_list))