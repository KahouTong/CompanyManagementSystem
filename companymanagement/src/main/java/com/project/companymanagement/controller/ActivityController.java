package com.project.companymanagement.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.companymanagement.config.ControllerException;
import com.project.companymanagement.entities.Activity;
import com.project.companymanagement.service.ActivityService;

@RestController
@CrossOrigin(origins = "http://localhost:4200" , maxAge = 3600)
@RequestMapping("Activity")
public class ActivityController {

	@Autowired
	ActivityService accService;

	@GetMapping("/allActivity")
	public List<Activity> getActivity() {
		List<Activity> Activity = null;
		try {
			Activity = accService.getActivity();
			if (Activity == null) {
				throw new NullPointerException("/Activity/allActivity" + ", Activity is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/Activity/allActivity", e.getMessage());
		}

		return Activity;
	}

	@GetMapping("/{accountId}/activity")
	public List<Activity> getContactByAccountId(@PathVariable(value="accountId") Long accountId) {

		return  accService.getActivity(accountId);
	}

	@GetMapping("/{accountId}/totalStatus")
	public String getTotal(@PathVariable Long accountId) {
		String Activity = null;
		try {
			Activity = accService.getTotal(accountId);
			if (Activity == null) {
				throw new NullPointerException("/Activity/totalStatus" + ", Total is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/Activity/totalStatus", e.getMessage());
		}
		return Activity;
	}

	@GetMapping("/{accountId}/totalOther/stat")
	public String total2(@PathVariable Long accountId ,@RequestParam(required = true) String stat) throws ControllerException {
		String temp = null;
		try {
			temp = accService.getTotal2(stat, accountId);
		}
		catch (Exception e) {
			//   Auto-generated catch block
			throw new ControllerException("/totalOther/stat", e.getMessage());
		}
		return temp;
	}

	@RequestMapping(method=RequestMethod.GET,value="findActivityById/{Id}")
	public Activity getActivityById(@PathVariable("Id") int id) {
		Activity Activity = null;
		try {
			Activity = accService.getSelectedActivity(id);
			if (Activity == null) {
				throw new NullPointerException("/Activity/findActivityById" + ", Activity selected is null or empty");
			}
		} catch (Exception e) {
			throw new ControllerException("/Activity/findActivityById", e.getMessage());
		}
		return Activity;	
	}

	/*###################Save Section #######################*/

	@RequestMapping(value="/saveActivity",method=RequestMethod.POST)
	public void saveActivity(@RequestBody Activity Activity)
	{
		try {
			if (Activity == null)  {
				throw new NullPointerException("/Activity/saveActivity" + ", Activity is null or empty");
			}
			accService.saveActivity(Activity);

		} catch (Exception e) {
			throw new ControllerException("/Activity/saveActivity", e.getMessage());
		}		
	}

	@PostMapping("/{accountId}/activity")
	public Activity addAssignment(@PathVariable Long accountId,
			@Valid @RequestBody Activity activity) {
		return accService.addActiviity(accountId, activity);
	}


	/*###################Delete Section #######################*/	

	@RequestMapping(method=RequestMethod.DELETE,value="deleteActivityById/{Id}")
	public int deleteActivityById(@PathVariable("Id") int id) 
	{
		int i=0;
		try {
			i=accService.deleteActivity(id);	
		} catch (Exception e) {
			throw new ControllerException("/Activity/deleteActivityById", e.getMessage());
		}	

		return i;
	}

	@DeleteMapping("/{accountId}/activity/{activityId}")
	public String deleteAssignment(@PathVariable Long accountId,
			@PathVariable Long activityId) {
		return accService.delete(accountId, activityId);
	}

	/*###################Update Section #######################*/	

	@RequestMapping(value="/editActivity",method=RequestMethod.PUT)
	public void editActivity(@RequestBody Activity Activity)
	{
		try {
			if (Activity == null)  {
				throw new NullPointerException("/Activity/editActivity" + ", Activity is null or empty");
			}
			accService.editActivity(Activity);
		} catch (Exception e) {
			throw new ControllerException("/Activity/editActivity", e.getMessage());
		}	
	}


	@PutMapping("/{accountId}/activity/{activityId}")
	public Activity updateAssignment(@PathVariable Long accountId,
			@PathVariable Long activityId,
			@Valid @RequestBody Activity activityUpdated) {

		return accService.updateActivity(accountId,activityId,activityUpdated);
	}
}