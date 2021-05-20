package com.project.companymanagement.repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.companymanagement.entities.Activity;

@Repository
public interface ActivityRepo extends JpaRepository<Activity, Long>{

	@Transactional
	@Modifying
	@Query("update Activity u set u.activityname = :activityname, u.estdate = :estdate, u.actdate = :actdate, u.comment = :comment, u.status = :status where u.activityid = :activityid")
	void setActivityById(String activityname, String estdate, String actdate, String comment,String status, Long activityid);
	//SELECT d.activityid, d.activityname, d.status FROM activity d
	@Query(value = "select count(*) from activity d where d.account_id = :accountId", nativeQuery = true)
	String totalBySelected(long accountId);
	
	@Query(value = "select count(*) from activity d where d.status = :stat and d.account_id = :accountId", nativeQuery = true)
	String totalCompleted(String stat, long accountId);
	
	@Query(value = "select * from activity d where d.account_id = :accountid", nativeQuery = true)
	List<Activity> findByAccountId(long accountid);
}
