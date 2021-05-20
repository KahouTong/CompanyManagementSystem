package com.project.companymanagement.entities;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "activity")
@Getter
@Setter
public class Activity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long activityid;
	
	private String activityname;
	
	private String estdate;
	
	private String actdate;

	private String comment;
	
	private String status;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "account_id", nullable = false)
    @JsonIgnore
	private AccountProfile account;
}
