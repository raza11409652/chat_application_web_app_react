# step to  start app in development
   - Make sure to start backend service first , You can find backend code at github  
   [link here](https://github.com/raza11409652/chat_application_node_js_backend) 
   - Git clone this app into your local machine
   - Note Local machine should have node js version >16
   - now you need to move to the local directory 
   > cd chat-application-web-app-react 
   - install the the dependencies
   > npm install
   - copy .env.example file to .env
   > cp .env.example .env
   - If you have made any changes in backend service port, make sure to change accordingly in .env file 
   - Now start application
   > npm run dev
   - App will start at 5173 port by default if you want to change this you can pass --port in while running npm run dev
