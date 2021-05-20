package com.project.companymanagement.service;

import java.util.List;

import javax.validation.Valid;

import com.project.companymanagement.entities.Activity;

public interface ActivityService {
	
	void saveActivity(Activity accActivity);
	
	public int deleteActivity(int id);
	
	public List<Activity> getActivity();
	
	public Activity getSelectedActivity(int id);

	void editActivity(Activity accActivity);
	
	public String getTotal(long accountId);
	
	public String getTotal2(String stat, long accountId);

	public List<Activity> getActivity(long accountId);

	Activity addActiviity(long accountId, Activity activity);

	Activity updateActivity(Long accountId, Long activityId, @Valid Activity activityUpdated);

	String delete(Long accountId, Long activityId);
}
