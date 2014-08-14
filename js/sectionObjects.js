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
	},
	{
		"title": "Country",
		"help_text": "Please indicate the country office using the format: City, Country: Addis Adaba, Ethiopia",
		"input_type": "text",
		"cartodb_field": "q02_country"
	},
	{
		"title": "Primary Sector",
		"help_text": "Please select the primary sector",
		"input_type": "radio",
		"cartodb_field": "q03a_sector",
		"input_value": [
			"Health", "HIV", "Nutrition", "WASH", "Education", "Child Protection", "Monitoring and Evaluation", "Supply", "Social Inclusion", "Emergency", "C4D", "Social Policy"
		],
		"colors": [
			'#ff6600', '#850200', '#ff00ff', '#0099ff', '#136400', '#081b47', '#33ff00', '#9999cc', '#7b00b4', '#cc0066', '#990066'
		]  
	},
	{
		"title": "Other Sectors",
		"help_text": "Please select any additional sector(s) if applicable",
		"input_type": "checkbox",
		"cartodb_field": "q03b_sector",
		"input_value": [
			"Health", "HIV", "Nutrition", "Education", "Child Protection", "Social Inclusion", "Emergency", "C4D", "Social Policy", "Supply", "Monitoring and Evaluation", "Other"
		]
	},
	{
		"title": "Scale",
		"help_text": "What is the project's current scale? Note: please don't check the end goal of the project's scale", 
		"input_type": "radio",
		"cartodb_field": "q04_scale",
		"input_value": [
			"Prototype", "Sub-National", "National", "Multi-National", "Multi-Regional"
		]
	},
	{
		"title": "Issue",
		"help_text": "What is the issue being addressed? (Limit response to 100 words, 50 words recommended).",
		"input_type": "textarea",
		"cartodb_field": "q05_issue"
	},
	{
		"title": "Solution",
		"help_text": "What is the solution? What tools were used, i.e. RapidSMS, U-Report, etc.? Which partners or vendors are involved in the development?",
		"input_type": "textarea",
		"cartodb_field": "q06_solution"
	},
	{
		"title": "Results",
		"help_text": "What are the results so far? (Limit response to 100 words, 50 words recommended).",
		"input_type": "textarea",
		"cartodb_field": "q07_results"
	},
	{
		"title": "Target Users",
		"help_text": "Who are the target users for the solution?",
		"input_type": "checkbox",
		"cartodb_field": "q08_users",
		"input_value": [
			"UNICEF Staff", "Innovation Labs", "General Public", "Government/Ministries", "Multilateral Organizations", "N.G.O.s", "Frontline Workers", "Donors", "Others"
		]
	},
	{
		"title": "Creators",
		"help_text": "Who are the creators of the solution? Please list partner or vendor names in the blank next to 'Other'.",
		"input_type": "checkbox",
		"cartodb_field": "q09_creators",
		"input_value": [
			"UNICEF Staff", "Innovation Labs", "Government/Ministrires", "Multilateral Organizations", "Academia", "N.G.O.s", "Private Sector Organizations", "Other"
		]
	},
	{
		"title": "Status",
		"help_text": "What is the current status of the project?",
		"input_type": "radio",
		"cartodb_field": "q10_status",
		"input_value": [
			"Under Development (project is in planning phase)", "Active (project is active either in pilot, implementation, scaling stages)", "On Hold", "Decommissioned"
		]
	},
	{
		"title": "Links",
		"help_text": "Links to any websites / media / awards / collaterals. Please separate your responses with commas.",
		"input_type": "text",
		"cartodb_field": "q11_links"
	},
	{
		"title": "Contacts",
		"help_text": "List the email(s) of any contact person(s) . Please limit to 3 contacts.",
		"input_type": "text",
		"cartodb_field": "q12_contacts"
	},
	{
		"input_type": "hidden",
		"cartodb_field": "the_geom"
	}
]};