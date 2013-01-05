    * range(10) - range from 0 to 9
    * range(-10, 10) - range from -10 to 9 (-10, -9, ... 0, 1, ... 9)
    * range(-10, 10, 2) - range from -10 to 8, skipping every 2nd element (-10, -8, ... 0, 2, 4, 6, 8)
    * range(10, 0, 2) - reverse range from 10 to 1, skipping every 2nd element (10, 8, 6, 4, 2)
    * range(10, 0) - reverse range from 10 to 1
    * range('5..50') - range from 5 to 49
    * range('50..44') - range from 50 to 45
    * range('1,1.1..4') - range from 1 to 4 with increment of 0.1 (1, 1.1, 1.2, ... 3.9)
    * range('4,3.9..1') - reverse range from 4 to 1 with decerement of 0.1
    * range('[1..10]') - range from 1 to 10 (all inclusive)
    * range('[10..1]') - range from 10 to 1 (all inclusive)
    * range('[1..10)') - range grom 1 to 9
    * range('[10..1)') - range from 10 to 2
    * range('(1..10]') - range from 2 to 10
    * range('(10..1]') - range from 9 to 1
    * range('(1..10)') - range from 2 to 9
    * range('[5,10..50]') - range from 5 to 50 with a step of 5 (all inclusive)
