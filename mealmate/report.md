Personal Programming Project Report
Title:
Provide a descriptive title for your project.
1.	(5pts) Honor Code and LLM Usage for this Report: As a Hokie, I will conduct myself with honor and integrity at all times. I will not lie, cheat, or steal, nor will I accept the actions of those who do.
During the preparation of this assignment Hitaishi Posanpeta used Claude Anthropic in to generate the initial project structure and component files, debug errors to save time and have a clear structure on what I’m working on. After using this tool, I/we reviewed and edited the content as needed to ensure its accuracy and take full responsibility for the content in relation to grading.

2.	(15pts) Learning Objectives:
List the learning objectives from your proposal. In your own words explain whether you met those objectives and how (50-100 words each objective).  Also describe if you learned something different than expected or anything additional.

A.	Objective 1: Learn how to integrate external APIs into a frontend application
I met this objective by connecting real API — Spoonacular for meal plan generation and recipe data. I learned how to construct fetch requests with query parameters and API keys, handle async responses, and parse JSON data into usable React state. I also ran into real-world issues like CORS restrictions, proxy configuration, and environment variable setup in Vite, which taught me more than I expected about how browsers interact with external services.

Objective 2: Learn how to use React hooks to manage application state
I met this objective by building a custom hook (useMealPlan.js) that encapsulates all the logic for fetching, storing, and updating the meal plan and grocery list. I also used built-in hooks throughout the app like useState for UI state, useEffect for side effects, useCallback for stable function references, and useMemo for derived data like filtered and grouped grocery items. I learned how separating logic into hooks makes components cleaner and easier to reason about.


3.	(15pts) Timeline:
Outline how you spent time on your project. Break down the time into specific tasks or milestones. Here is an adjustable schedule to get you started. Actual Details should be 50-100 words each and should compare or reflect on differences from your proposal.

Time	Task	Expected Details from Proposal	Actual Details
Hour 1-2	Research and gather resources	Research React, Spoonacular API, and Tailwind CSS documentation	Explored Spoonacular API docs to understand the meal planner endpoint and response structure. Reviewed Anthropic Claude API docs for the messages endpoint. Confirmed both had free or low-cost tiers suitable for a class project.
Hour 3-4	Design the project structure and plan	Plan component hierarchy and data flow
	Designed the full file structure with separate folders for components, hooks, and utils. Mapped out how data flows from PreferencesForm → useMealPlan hook → MealCalendar and GroceryList. Decided to keep all state in App.tsx and pass down via props.
Hour 5-6	Start coding the basic functionalities	Plan component hierarchy and data flow	Built the Spoonacular utility functions, the useMealPlan custom hook, and PreferencesForm. Got the meal plan generating and rendering in MealCalendar with basic MealCards. Ran into issues with Tailwind v4 not supporting the old config format.
Hour 7-8	Test and debug the initial version	Build PreferencesForm, API calls, basic meal display	Debugged several issues: Tailwind v4 required @import "tailwindcss" instead of @tailwind directives and custom colors had to be defined in CSS using @theme instead of tailwind.config.js. Fixed a filename typo (PrefrencesForm vs PreferencesForm) that caused an import error. Resolved JSON parse error by removing the Vite proxy and calling Spoonacular directly.
Hour 9-10	Refine and add advanced features	Test API responses and fix rendering bugs	Completed GroceryList with aisle grouping, search, and checkboxes.
Additional		Add grocery list, recipe modals, AI assistant	

4.	(55pts) Final Product Description:
Include your proposed MVP, Target, and Reach versions. 
i.	Minimum Viable Product (MVP): Preferences form with diet, servings, days, cuisine, and calorie inputs. Spoonacular API integration to generate a weekly meal plan. Basic grocery list extracted from the meal plan ingredients.

ii.	Target Product: Recipe detail modals with full ingredient lists and instructions. Categorized and searchable grocery list Nutrition summary (average calories, protein, carbs, fat per day).


iii.	Reach Version: User accounts with saved meal plans. Shareable grocery list links. Drag-and-drop meal calendar. Nutrition charts and visualizations.

iv.	(20pts) Description of final product including target audience, user story, problem statement, key features, technical details and technologies used. (100 – 150 words) 

MealMate is an AI-powered weekly meal planner built for busy individuals and students who want to eat intentionally without spending hours planning. Users select their dietary preferences, number of servings, days, cuisine, and calorie target, and MealMate instantly generates a full weekly meal plan using the Spoonacular API. Each meal card opens a recipe modal with ingredients and instructions. The grocery list automatically deduplicates and groups ingredients by aisle with checkboxes for shopping. An AI assistant powered by the Anthropic Claude API suggests ingredient substitutions. The app is built with React 18, TypeScript, Vite, and Tailwind CSS v4, with no backend or database required.

v.	(20pts) Provide a YouTube link to your video demonstration (1–2 minutes, narrated). Important Note: Do not upload your video file directly. Instead, upload your video to YouTube and include the video link clearly here in your report. The level of difficulty and detail of the project should be reasonable for 10 hours of work with LLM support. The project should not be something an LLM can solve without significant effort by the developer. (Be sure to have someone else test that your link is working.)

https://youtu.be/KFwTVsF-jbI

vi.	(15pts) Any input files, coding files, and test files should be uploaded. Provide a list here of file names and purposes, or any links to live sites or artifacts. Remember code should also be commented.  A README file should be created and uploaded so that we have the option to follow your instructions to run your project.

Project Repository & Code Submission Details:
Project Repository on git.cs.vt.edu (other options are code.vt: https://code.vt.edu/ or (Git-hub only if you are part of virtual global collaboration)): Your repository should be well-organized, documented, and easy to navigate. At a minimum, include the following structure:
●	code/ – All source code files for your project (organized by component or module if applicable).
●	data/ – Any input files, datasets, or configuration files used by your program.
●	tests/ – Test scripts or files demonstrating how your code was verified.
●	docs/ – Supporting materials such as screenshots, reports, or documentation.
●	report/ – This final report document.
●	README.md – A detailed file describing:
■	Project overview and purpose
■	Video link of your project
■	Installation and setup instructions
■	How to run the program and reproduce results
■	Technologies or libraries used
■	Author(s) and contribution summary

Required:
●	Maintain a logical directory structure, do not store all files at the root level.
●	Include comments in your code to explain logic and design decisions.
●	Keep your repository private until grades are released, then you may make it public.
Share access with the following personnel (Add them as collaborators): 

GTA Name	Section(s)	Professor
Mona Moghadampanah	13392 & 13394 	S. Cao
Katelyn Crumpacker	13393 & 13395 	M. Ellis


5.	(10pts) Consultation and Use of LLMs:
Each student must create a unique project but is allowed to consult with other people and use Large Language Models (LLMs). Describe how you incorporated these resources into your project:
●	Consultation Description:
Describe how you ended up seeking advice or feedback from peers, mentors, or online communities.
I consulted with a friend during the planning phase of the project to get feedback on the concept and feature scope. They suggested that a budget filter or per-meal cost estimate would be a useful addition to the app, since how much someone is willing to spend on groceries varies a lot from person to person. While I didn't end up implementing a budget feature in the final version, their input helped me think more critically about the target audience and what features would matter most to real users.

●	Use of LLMs:
Explain how you ended up utilizing LLMs to assist with coding, debugging, learning technologies and concepts, or generating ideas.
I used Claude (Anthropic) extensively throughout this project as a coding assistant. I used it to generate the initial project structure and component files, debug errors as they came up during development (including Tailwind v4 breaking changes, Vite proxy configuration issues, TypeScript import errors from mismatched file extensions, and JSON parse errors from misconfigured API calls), and to understand concepts like custom React hooks, the Vite dev server proxy, and how environment variables work in a browser context. The LLM saved significant time on syntax, but I still had to understand each piece of code, integrate everything into a working TypeScript project, troubleshoot real environment-specific errors and make decisions about the project structure and feature scope myself.
