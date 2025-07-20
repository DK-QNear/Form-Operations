package com.form.formoperation.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.form.formoperation.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    
}
