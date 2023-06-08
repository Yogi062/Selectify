from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from openpyxl import *
import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import csv

# Create a new instance of the Chrome driver
driver = webdriver.Chrome()

# Navigate to the Flipkart website
driver.get("https://www.amazon.com/")

# Wait for the pop-up to appear and then close it



driver_path = 'chromedriver'
driver = webdriver.Chrome(executable_path=driver_path)
driver.get("https://www.amazon.com/")
#driver.get("https://www.monsterindia.com")
driver.implicitly_wait(10)

#driver.find_element(By.XPATH,"//input[contains(@id,'SE_home_autocomplete')]").send_keys("Python")
#driver.find_element(By.XPATH,"//input[contains(@value,'Search')]").click()

Product_name = []
Retail_price = []
Discounted_price = []
Image = []
Product_url = []
Rating = []
Description = []
Assured = []

def scrollDown(browser, numberOfScrollDowns):
    body = browser.find_element(By.TAG_NAME, "body")
    while numberOfScrollDowns >=0:
        body.send_keys(Keys.PAGE_DOWN)
        numberOfScrollDowns -= 1
    return browser

def jobs_from_page(driver):
    driver.implicitly_wait(10)


    # Continue with your automation code here...
    driver = scrollDown(driver, 20)
    driver.implicitly_wait(10)
    
    product_name = driver.find_elements(By.XPATH, "//h2[@class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']/a/span")
    product_url = driver.find_elements(By.XPATH, "//h2[@class='a-size-mini a-spacing-none a-color-base s-line-clamp-2']/a")
    retail_price = driver.find_elements(By.XPATH, "//span[@class='a-price-whole']")
    discounted_price = driver.find_elements(By.XPATH, "//span[@class='a-price a-text-price']")
    image = driver.find_elements(By.XPATH, "//img[@class='s-image']")
    description = driver.find_elements(By.XPATH, "//span[@class='a-size-base-plus a-color-base a-text-normal']")
    rating = driver.find_elements(By.XPATH, "//div[@class='a-row a-size-small']/span[1]/span[1]/a/i/span")

    '''Company = driver.find_elements(By.XPATH,"//span[contains(@class,'company-name')]")
    Location = driver.find_elements(By.XPATH,"//div[contains(@class,'col-xxs-12 col-sm-5 text-ellipsis')]")
    Experience = driver.find_elements(By.XPATH,"//div[contains(@class,'exp col-xxs-12 col-sm-3 text-ellipsis')]")
    Package = driver.find_elements(By.XPATH,"//div[contains(@class,'package col-xxs-12 col-sm-4 text-ellipsis')]")
    Posted = driver.find_elements(By.XPATH,"//div[contains(@class,'posted-update')]/span[2]")
    #Skill = driver.find_elements(By.XPATH,"//p[contains(@class,'descrip-skills')]") 
    Link = driver.find_elements(By.XPATH,"//h3[contains(@class,'medium')]/a")'''

    #//input[contains(@class,'btn') and contains(@value,'Search')]

    #print('------------')
    for t in product_name:
        #print("\n")
        #print("\n")
        try:
            print(t.text)
            Product_name.append(t.text)
        except:
            continue
        
    #print('------------')
    for c in retail_price:
        #print(c.text)
        try:
            print(c.text)
            Retail_price.append(c.text)
        except:
            continue
        
    #print('------------')
    for l in discounted_price:
        #print(l.text)
        try:
            print(l.text)
            Discounted_price.append(l.text)
        except:
            continue
        
    #print('------------')
    for e in description:
        #print(e.text)
        try:
            print(e.text)
            Description.append(e.text)
        except:
            continue
        
    #print('------------')
    for p in rating:
        #print(p.text)
        try:
            print(p.text)
            Rating.append(p.text)
        except:
            continue
        
    #print('------------')	
    for ps in image:
        #print(ps.get_attribute('src'))
        try:
            print(ps.get_attribute('src'))
            Image.append(ps.get_attribute('src'))
        except:
            continue
        
    #print('------------')	
    for lk in product_url:
        #print(lk.get_attribute('href'))
        try:
            print(lk.get_attribute('href'))
            Product_url.append(lk.get_attribute('href'))
        except:
            continue
        
    #print('------------')
    '''for x in assured:
        print(x.get_attribute('href'))
        Assured.append(x.get_attribute('href'))
    print('------------')'''
    
    
    '''for i in range(len(product_name)):
        count = count + 1
        writer.writerow({
            'product_id' : count,
            'product_url': Product_url[i],
            'product_name': product_name[i],
            'retail_price': retail_price[i],
            'discounted_price': discounted_price[i],
            'image': image[i],
            'description': description[i],
        })'''
        

last_page = 1
search_bar = driver.find_element(By.NAME, "q")
search_bar.send_keys("laptop")
search_bar.submit()
try:
    # Wait for the pop-up to appear
    pop_up = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@class='_2KpZ6l _2doB4z']")))
    # Click on the close button of the pop-up
    pop_up.click()
    print("pop up found")
except:
    print("No pop-up was found or it could not be closed.")
'''with open('products.csv', mode='a+', newline='') as csv_file:
    fieldnames = ['product_id','product_url', 'product_name' 'retail_price', 'discounted_price', 'image', 'description']
    writer = csv.DictWriter(csv_file, fieldnames=fieldnames)

    writer.writeheader()
count = 0'''
for i in range(1,last_page+1):
    print(i)
    #time.sleep(5)
    jobs_from_page(driver)
    try:
    # Wait for the pop-up to appear
        pop_up = WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.XPATH, "//button[@class='_2KpZ6l _2doB4z']")))
    # Click on the close button of the pop-up
        pop_up.click()
        print("pop up found")
    except:
        print("No pop-up was found or it could not be closed.")
    '''from selenium.webdriver.common.by import By
    from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC

    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.visibility_of_element_located((By.XPATH, "//button[contains(@class,'btn-next-prev btn-next')]")))
    element.click()'''
    '''from selenium.webdriver.support.ui import WebDriverWait
    from selenium.webdriver.support import expected_conditions as EC
    from selenium.webdriver.common.by import By

    # wait for the element to become clickable
    wait = WebDriverWait(driver, 10)
    element = wait.until(EC.element_to_be_clickable((By.XPATH, "//a[@class='_1LKTO3']/span[text()='Next']")))

    # click on the element
    driver = element.click()
    print("successful")'''
    try:
        element = driver.find_element(By.XPATH, "//a[@class='_1LKTO3']/span[text()='Next']")
        driver.execute_script("arguments[0].click();", element)
    except:
        break
    #driver.execute_script("arguments[0].scrollIntoView();", element)
    print("its here")
    #driver = element.click()
    print("successful")
	#driver.implicitly_wait(15)
    #print(driver.current_url)
    

'''
print('------------')
for s in Skill:
    print(s.text)
    skill_list.append(s.text)  
'''
final_list = zip(Product_url, Product_name, Retail_price, Discounted_price, Image, Description, Rating)
excel_columns = ["product_url", "product_name", "retail_price", "discounted_price", "image", "description","rating"]

wb = Workbook()
wb['Sheet'].title = "laptop"
sheet_1 = wb.active
sheet_1.append(excel_columns)

for data in list(final_list):
	#print(data)
	sheet_1.append(data)

wb.save("laptop.csv")

driver.quit()