.PHONY: daily

daily: 
	node scripts/fetch-schedule.js && node scripts/proc_schedule.js
