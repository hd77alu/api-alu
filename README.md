# Playing Around with APIs
This is an API that generate a book recommendation to the user based on a genre. Helping users to discover relevant reading materials tailored to their preferences.
This API presents data in a clear, logical format to ensure effortless comprehension. It also empowers users with interactive features like filtering and incorporates robust error handling for a smooth and responsive web experience.

**API Original Creator:** [Sameer Kashyap](https://rapidapi.com/user/mistakenpirate38)
**API Documentation:** [Rapidapi](https://rapidapi.com/mistakenpirate38/api/book-recommender1)
# Usage
Try The API from [My Website](https://www.hamed-alfatih.tech/api.html)
& Watch This [Demo Video](https://www.loom.com/share/280d79eab6bf4fd9a214a4ad24bf220f)
- To run the application localay `git clone https://github.com/hd77alu/api-alu`
- Go to the project `cd api-alu`
- obtain an APi key from [Rapidapi](https://rapidapi.com/mistakenpirate38/api/book-recommender1)
- Edit the `api.js` headers
   ```
  headers: {
        'x-rapidapi-key': [your API Key]
  ```
- Star your local server `http-server -p 8000` & Run it in the browser `http://localhost:8000`
# Challanges
- The deadline was a huge challange for me but I was able to overcome this problem by rearangin my priorities  & dedication.
- Some of The requirement were very difficult to obtain information about- but I was able to utilize my research skills to get all the documentations I need.
- Overall, I'm satisfied with the experiences although the deadline & the implementation were challenging.
# Local Implementation & Deployment steps for my web application
- **Local Implementation**
- Created all the required files, including CSS, HTML, JavaScript, config.js, and .env, in my WebStorm IDE.
- Implemented the fetch method in the api.js file to interact with the API.
- Successfully connected the API key securely to the application files.
- Utilized necessary JavaScript methods, such as (document.getElementById, innerHTML, style.display...etc) for functionality and user interaction.
- Thoroughly tested the application locally on localhost and implemented necessary improvements to ensure smooth functionality.

- **Deployment**
- Used the scp command in the terminal to copy and transfer all required files from the local machine to remote servers.
- Example:
```
scp -i ~/.ssh/school filename user@<IP address>:<destination>
```
- Accessed the remote servers (web-01, web-02) via SSH to verify and manage the transferred files.
- Ensured all files were correctly placed in the ```/var/www/html/``` directory on the Nginx servers.
- Edited the Nginx configuration file located at ```/etc/nginx/sites-available/default``` to correctly serve the desired HTML file.
- Run `sudo service nginx -t` to make that the configuration is ok.
- Restarted the Nginx service to apply the configuration updates.
- Accessed the load balancer server (lb-01) and verified that the configuration file ```/etc/haproxy/haproxy.cfg``` was set up to distribute traffic evenly between the two servers, ensuring consistent content delivery.
# Bonus Task
Implementing input validation for advanced security measures and protection against common vulnerabilities like SQL injection and cross-site scripting (XSS) attacks.

