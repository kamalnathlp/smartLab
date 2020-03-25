## **Installing and Configuring application in your local machine**

**1. Clone the Repository in you local machine, use the following link**.  
Please find the [GitHub Repo](https://github.com/kamalnathlp/smartLab.git).

**2. Install node and npm in your system**.  
Please find the instructions for [node installation](https://nodejs.org/en/download/package-manager/) or [Direct Download](https://nodejs.org/en/download/)

**3. After installing nodejs and cloning repo in local system**  
Move to the [LabAdmin](https://github.com/kamalnathlp/smartLab/tree/master/LabAdmin) Directory of your application folder and
type the following command in command prompt or or Powershell or Terminal(Linux or MacOs)

     npm install

**4. Install MySql in your local system and set custom values like username, password**  
Change your MySql values in your [db_config.js](https://github.com/kamalnathlp/smartLab/blob/master/LabAdmin/db_config.js)

**5. To start your application, type the following command inside the [LabAdmin](https://github.com/kamalnathlp/smartLab/tree/master/LabAdmin) Directory**  

    nodemon index
    
**6. Open browser and type the following URL's for user login page and adminPage**  
 http://localhost:3001/ [Login Page]  
 http://localhost:3001/admin/ [Admin Page]  
 
 
 ![Image of AdminLogin]
 (https://github.com/kamalnathlp/smartLab/blob/master/screenShots/admin_git.png)
 
 
 ![Image of HODLogin]
 (https://github.com/kamalnathlp/smartLab/blob/master/screenShots/hod_git.png)
 
  ![Image of AdminPanel]
 (https://github.com/kamalnathlp/smartLab/blob/master/screenShots/admin_panel_git.png)
