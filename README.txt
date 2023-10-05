
1-Tool selection:

	First, I started with cypress because after researching I found that it is ideal for beginners. 
	When iframes appeared I realized that playwright would be much better for implementing the task

	Additional reasons for selecting Playright:
	1. supports cross-browser testing
	2. allows testing on various devices and viewports
	3. supports parallel test execution
	4. interact with page elements more efficiently
	5. Playwright supports various programming languages (JavaScript, TypeScript, Python, etc.)


2-Deliverables:

	A test suite that contains the following scenarios:
	Scenario1_Succesful_payment  (expected to be delivered)
	Scenario2_Failed_payment   (expected to be delivered)

	Scenario3_Wrongcard   (extra scenario - insert wrong card - error message to be displayed)
	Scenario4_wrongdate   (extra scenario - insert wrong date - error message to be displayed)
	Scenario5_wrongcvv   (extra scenario - insert wrong cvv with 2 letters - error message to be displayed)
	Scenario6_emptyname   (extra scenario - empty name - error message to be displayed)
	Scenario7_Wrong_cvv_test_pass   (extra scenario - insert wrong cvv - error message should be displayed but the user redericted to the next page)
	Scenario8_Wrong_name_test_pass   (extra scenario - insert wrong name - error message should be displayed but the user redericted to the next page)


3-Points I struggled with:

	1. Cypress has difficulty working with iframes (The reason that I changed tool)
	2. Find a solution to put the .html to a variable outside the tests
	3. Remember work with github


4-Steps to follow:

	1. Install Visual Studio Code (If you don't already have Visual Studio Code installed)

	2. Clone the GitHub Repository
		Open a terminal, navigate to the directory where you want to clone the repository
		clone the Playwright project from GitHub 
		git clone <repository_url>

	3. Open the Cloned Repository in VS Code
		code .

	4. Install Node.js 
		[Node.js](https://nodejs.org/)
		
	5. Install npm
		npm install
	
	6. Install Playwright and Verify that Playwright is installed successfully
		npx playwright install 
		npx playwright --version

	7. Initialize a new Node.js project
		npm init -y

	8. Running the tests
		npx playwright test --headed

	9. View Test Results in the terminal




