var countries = {
	"HQ": ["ALL"], 
	"CEE_CIS": ["Albania", "Bosnia and Herzegovina", "Bulgaria", "Turkey", "Georgia", "Kyrgyzstan", "Belarus", "Serbia", "Montenegro", "Tajikistan", "Croatia", "Republic of Moldova", "Romania", "Kazakhstan", "Ukraine", "Turkmenistan", "Uzbekistan"],
    "EAPRO": ["Cambodia", "Philippines", "China", "Fiji", "Lao People\"s Democratic Republic", "Mongolia", "Malaysia", "Indonesia", "Korea, Democratic People\"s Republic of", "Timor-Leste", "Burma", "Papua New Guinea", "Thailand", "Viet Nam"],
    "ESARO": ["Angola", "Burundi", "Comoros", "South Africa", "Eritrea", "Kenya", "Namibia", "Ethiopia", "Somalia", "Madagascar", "Botswana", "Rwanda", "Lesotho", "Malawi", "Uganda", "Swaziland", "Zambia", "United Republic of Tanzania", "Zimbabwe", "Mozambique"],
    "MENA": ["Tunisia", "Algeria", "Egypt", "Jordan", "Lebanon", "Morocco", "Djibouti", "Syrian Arab Republic", "Palestine", "Iran (Islamic Republic of)", "Saudi Arabia", "Sudan", "Iraq", "Oman", "Libyan Arab Jamahiriya", "Yemen"],
    "ROSA": ["Afghanistan", "Pakistan", "Sri Lanka", "Bhutan", "Bangladesh", "Nepal", "India", "Maldives"],
    "TACRO": ["Barbados", "Paraguay", "Suriname", "Peru", "Argentina", "Bolivia", "Belize", "Brazil", "Costa Rica", "French Guiana", "Guyana", "Haiti", "Honduras", "Colombia", "Chile", "Jamaica", "Cuba", "Venezuela", "Nicaragua", "Ecuador", "El Salvador", "Uruguay", "Dominican Republic", "Guatemala", "Panama", "Mexico"],
    "WCARO": ["Central African Republic", "Cameroon", "Senegal", "Gambia", "Ghana", "Cote d\"Ivoire", "Liberia", "Congo", "Benin", "Democratic Republic of the Congo", "Niger", "Guinea-Bissau", "Sierra Leone", "Equatorial Guinea", "Togo", "Sao Tome and Principe", "Guinea", "Burkina Faso", "Cape Verde", "Chad", "Western Sahara", "Gabon", "Mali", "Mauritania", "Nigeria"]
};

var form_json = {"sections" : [
	{
		"title": "Project Name",
		"help_text": "What is the name of the project?",
		"input_type": "text",
		"cartodb_field": "q01_project",
		"required": true
	},
	{
		"title": "Country",
		"help_text": "Please indicate the country office using the format: City, Country: Addis Adaba, Ethiopia",
		"input_type": "text",
		"cartodb_field": "q02_country",
		"required": true
	},
	{
		"title": "Focus Areas",
		"help_text": "Please select all that applies.",
		"input_type": "checkbox",
		"cartodb_field": "q03b_sector",
		"input_value": [
			"Health", "HIV", "Nutrition", "WASH", "Education", "Child Protection", "Monitoring and Evaluation", "Supply", "Social Inclusion", "Emergency", "C4D", "Social Policy", "Other"
		],
		"required": true,
		"colors": [
			'#ff6600', '#850200', '#ff00ff', '#0099ff', '#136400', '#081b47', '#33ff00', '#9999cc', '#7b00b4', '#cc0066', '#990066'
		]
	},
	{
		"title": "Portfolio",
		"help_text": "Please select all that apply.", 
		"input_type": "checkbox",
		"cartodb_field": "portfolio",
		"input_value": [
			"Youth Engagement", "Real-time Data", "Infrastructure"
		],
		"required": true
	},
	{
		"title": "Scale",
		"help_text": "What is the project's current scale? Note: please don't check the end goal of the project's scale", 
		"input_type": "radio",
		"cartodb_field": "q04_scale",
		"input_value": [
			"Prototype", "Sub-National", "National", "Multi-National", "Multi-Regional"
		],
		"required": true
	},
	{
		"title": "Target Users",
		"help_text": "Who are the target users for the solution?",
		"input_type": "checkbox",
		"cartodb_field": "q08_users",
		"input_value": [
			"End Beneficiaries", "Government Authorities", "Development Authorities", "Frontline Workers", "Donors",  "UNICEF Offices", "Other"
		],
		"required": true 
	},
	{
		"title": "Creators",
		"help_text": "Who are the creators of the solution? Please list partner or vendor names in the blank next to 'Other'.",
		"input_type": "checkbox",
		"cartodb_field": "q09_creators",
		"input_value": [
			"UNICEF Staff", "Innovation Labs", "Government/Ministrires", "Multilateral Organizations", "Academia", "N.G.O.s", "Private Sector Organizations", "Other"
		],
		"required": true
	},
	{
		"title": "Issue",
		"help_text": "What is the issue being addressed? (Limit response to 100 words, 50 words recommended).",
		"input_type": "textarea",
		"cartodb_field": "q05_issue",
		"required": true 
	},
	{
		"title": "Solution",
		"help_text": "What is the solution?",
		"input_type": "textarea",
		"cartodb_field": "q06_solution",
		"required": true 
	},
	{
		"title": "What's the core software technology being used (if applicable)?",
		"help_text": "Please chose from the list of software, or add your own.",
		"input_type": "checkbox",
		"cartodb_field": "software_tech",
		"input_value": [
			"Magpi", "AkvoFLOW", "Open Data Kit", "Commcare", "DevTrac", "RapidPro (formerly RapidSMS)", "Formhub", "RapidFTR", "DHIS 2", "CSPro", "DevInfo", "Other"
		],
		"required": false 
	},
	{
		"title": "Which partners have you been working with?",
		"help_text": "List all partners, such as government, NGO, academia and the private sector. Please separate your responses with commas.",
		"input_type": "textarea",
		"cartodb_field": "partners",
		"required": true
	},
	{
		"title": "Results",
		"help_text": "What are the results so far? (Limit response to 100 words, 50 words recommended).",
		"input_type": "textarea",
		"cartodb_field": "q07_results",
		"required": true
	},
	{
<<<<<<< HEAD
		"title": "What kind of evaluation method is being utilized?",
		"help_text": "What are the main indicators to evaluate results? (Limit response to 100 words, 50 words recommended).",
		"input_type": "textarea",
		"cartodb_field": "evaluation_method",
=======
		"title": "Target Users",
		"help_text": "Who are the target users for the solution?",
		"input_type": "checkbox",
		"cartodb_field": "q08_users",
		"input_value": [
			"UNICEF Staff", "Innovation Labs", "General Public", "Government/Ministries", "Multilateral Organizations", "N.G.O.s", "Frontline Workers", "Donors", "Others"
		],
>>>>>>> d7060e7d51b60baeae50f018d5be6f8a2ef8c28e
		"required": true
	},
	{
		"title": "Number of target users/beneficiaries impacted so far.",
		"help_text": "Please only use numbers.",
		"input_type": "text",
		"cartodb_field": "current_num_of_target",
		"required": true
	},
	{
		"title": "Expected number of target users/beneficiaries impacted by the end of 2015.",
		"help_text": "Please only use numbers.",
		"input_type": "text",
		"cartodb_field": "expected_num_of_target",
		"required": true
	},
	{
		"title": "Project start date",
		"help_text": "(mm/dd/yyyy)",
		"input_type": "text",
		"cartodb_field": "start_date",
		"required": true
	},
	{
		"title": "Is the project ongoing?",
		"help_text": "",
		"input_type":"radio",
		"input_value": [
			"Yes", "No"
		],
		"cartodb_field": "ongoing",
		"required": true
	},
	{
		"title": "When is the project expected to conclude or be handed over?",
		"help_text": "(mm/dd/yyyy)",
		"input_type": "text",
		"cartodb_field": "end_day",
		"required": false
	},
	{
		"title": "What's the estimated funding need for project to scale?",
		"help_text": "Please state numrical amount in USD.",
		"input_type": "text",
		"cartodb_field": "estimated_funding",
		"required": false

	},
	{
		"title": "Links",
		"help_text": "Links to any websites / media / awards / collaterals. Please separate your responses with commas.",
		"input_type": "text",
		"cartodb_field": "q11_links",
		"required": false
	},
	{
		"title": "Contacts",
		"help_text": "List the email(s) of any contact person(s) . Please limit to 3 contacts.",
		"input_type": "text",
		"cartodb_field": "q12_contacts",
		"required": true 
	},
	{
		"input_type": "hidden",
		"cartodb_field": "the_geom"
	},
	{
		"input_type": "hidden",
		"cartodb_field": "unicef_region"
	}
]};