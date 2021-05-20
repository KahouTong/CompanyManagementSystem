package com.project.companymanagement.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.companymanagement.config.GeneralException;
import com.project.companymanagement.entities.Activity;
import com.project.companymanagement.repository.AccountProfileRepo;
import com.project.companymanagement.repository.ActivityRepo;

@Service
@Transactional
public class ActivityServiceImpl implements ActivityService{

	@Autowired
	ActivityRepo activityRepo;

	@Autowired
	AccountProfileRepo accRepo;

	@Override
	public void saveActivity(Activity accActivity) {
		activityRepo.save(accActivity);		
	}

	@Override
	public int deleteActivity(int id) {
		activityRepo.deleteById((long) id);		
		return 1;
	}

	@Override
	public List<Activity> getActivity() {
		return (List<Activity>) activityRepo.findAll();
	}

	@Override
	public Activity getSelectedActivity(int id) {
		Optional<Activity> entityOptional = activityRepo.findById((long) id);
		if (entityOptional.isPresent()) {
			Activity Entity = entityOptional.get();
			return Entity;
		}
		return null;
	}

	@Override
	public void editActivity(Activity accActivity) {
		activityRepo.setActivityById(accActivity.getActivityname(), accActivity.getEstdate(), accActivity.getActdate(), accActivity.getComment(), accActivity.getStatus(),accActivity.getActivityid());		
	}

	@Override
	public String getTotal(long accountId) {
		return activityRepo.totalBySelected(accountId);
	}

	@Override
	public String getTotal2(String stat, long accountId) {
		return activityRepo.totalCompleted(stat, accountId);
	}

	@Override
	public List<Activity> getActivity(long accountId) {
//		if(!activityRepo.existsById(accountId)) {
//			return Collections.emptyList();
//		}

		return activityRepo.findByAccountId(accountId);
	}

	@Override
	public Activity addActiviity(long accountId, Activity activity) {
		return accRepo.findById(accountId)
				.map(account -> {
					activity.setAccount(account);
					return activityRepo.save(activity);
				}).orElseThrow(() -> new GeneralException("Account not found!"));
	}

	@Override
	public Activity updateActivity(Long accountId, Long activityId, @Valid Activity activityUpdated) {
		if(!accRepo.existsById(accountId)) {
			throw new GeneralException("Account not found!");
		}

		return activityRepo.findById(activityId)
				.map(activity -> {
					activity.setActivityname(activityUpdated.getActivityname());
					activity.setEstdate(activityUpdated.getEstdate());
					activity.setActdate(activityUpdated.getActdate());                    
					activity.setComment(activityUpdated.getComment());
					activity.setStatus(activityUpdated.getStatus());
					return activityRepo.save(activity);
				}).orElseThrow(() -> new GeneralException("Activity not found!"));
	}

	@Override
	public String delete(Long accountId, Long activityId) {
		if(!accRepo.existsById(accountId)){
			throw new GeneralException("Student not found!");
		}

		return activityRepo.findById(activityId)
				.map(activity -> {
					activityRepo.delete(activity);
					return "Deleted Successfully!";
				}).orElseThrow(() -> new GeneralException("Contact not found!"));
	}

}
