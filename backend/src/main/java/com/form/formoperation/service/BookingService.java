package com.form.formoperation.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.form.formoperation.model.Booking;
import com.form.formoperation.repo.BookingRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;

    public Booking createBooking(Booking request) {
        Booking booking=Booking.builder()
                        .name(request.getName())
                        .phoneNumber(request.getPhoneNumber())
                        .build();
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        if(!bookingRepository.existsById(id)){
            throw new IllegalArgumentException("Booking Not Found");
        }
        bookingRepository.deleteById(id);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking updateBooking(Long id, Booking updatedBooking) {
        return bookingRepository.findById(id)
            .map(existing ->{
                updatedBooking.setId(id);
                return bookingRepository.save(updatedBooking);
            })
            .orElseThrow(()-> new IllegalArgumentException("Booking Not Found"));
    }
    
}
