# SpreadSheeter

It is a Web App which I have build using VanillaJS, HTML and CSS as a personal project. It is a Spread Sheet App where a user can write data, style it, apply formulas to it, cut, copy and paste data from one range of cells to another. It also multi-sheet system i.e. a user can add new sheets for different data without affecting data in previous sheets. User can also download their sheet data as JSON and upload it again later to see it or make any changes to it. I have also used Graph's Cycle Detection Algorithm for user to visualize a cylic relation, if user inputs one by mistake. 

Website : https://spreadsheeter.netlify.app/

# Site Layout
![Overview](https://github.com/Dev-200219/SpreadSheeter/assets/82893669/c184837e-52a3-4a4b-84c0-8bfbc371b9ae)

# Writing and Styling of Data
Correspoding cell propertiels will be displayed when clicked on that cell.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/fa77577c-1072-4356-8c4b-1809819ddec8

# Adding Formula's to Cells
User needs to select the cell first and then enter the formula in the formula bar and press enter. Changes in the parent cells will also resukt in changes in child cells.
NOTE: Formula elements must be separated by spaces.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/844620d7-c1f6-4cef-b510-03d56aa815d9

# Cycle Detection and Visualization in Formula
User can visualize the cycle as many times he wants.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/c8814d98-1e33-4c1e-8d9c-2d9b211306ca

# Cut, Copy and Paste 
User can cut, copy and paste data from range of cells to another. User must press Ctrl Key and select TWO cells(first top-left and then bottom-right) which represent the range of cells and then choose the action(copy or cut) and then point to the desired cell and paste the data using action keys in action bar.
NOTE : Formula's of respective cell's will not be pasted to the new cells.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/fc190da5-47c8-4439-8e33-e6133b29b7a5

# Multiple Sheet Management
User can add multiple sheets by clicking on add sheet icon and a new sheet is generated. User can delete a sheet by double-clicking on it in the Sheet Navbar.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/9d6256d3-ef8b-407a-bd90-29918fa43693

# Download and Upload Sheet
User can download the current sheet in JSON format with all the styles and formula's. User can also upload the JSON sheet and it will be opened as a new sheet in the App.
https://github.com/Dev-200219/SpreadSheeter/assets/82893669/c4b2eb14-dc5b-4518-baac-df5b1cc697ff
