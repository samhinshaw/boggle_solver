library(jsonlite)
library(tidyverse)

# // Note: en.txt is not on codesandbox.io, but is
# // in my github repository: https://github.com/samhinshaw/boggle_solver
dictionary <- read_csv('en.txt', col_names = c('words'))

partOne <- dictionary %>% slice(seq(1, 50000))
partTwo <- dictionary %>% slice(seq(50001, 100000))
partThree <- dictionary %>% slice(seq(100001, 150000))
partFour <- dictionary %>% slice(seq(150001, 200000))
partFive <- dictionary %>% slice(seq(200001, 250000))
partSix <- dictionary %>% slice(seq(250001, 300000))

write_json(partOne, 'dict-01.json', dataframe = "columns")
write_json(partTwo, 'dict-02.json', dataframe = "columns")
write_json(partThree, 'dict-03.json', dataframe = "columns")
write_json(partFour, 'dict-04.json', dataframe = "columns")
write_json(partFive, 'dict-05.json', dataframe = "columns")
write_json(partSix, 'dict-06.json', dataframe = "columns")

