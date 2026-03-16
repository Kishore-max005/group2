package com.expense.tracker.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expense.tracker.model.Expense;
import com.expense.tracker.repository.ExpenseRepository;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepository repository;

    public Expense addExpense(Expense expense) {
        return repository.save(expense);
    }

    public List<Expense> getAllExpenses() {
        return repository.findAll();
    }

    public double getTotal() {

        List<Expense> list = repository.findAll();

        double total = 0;

        for (Expense e : list) {
            total += e.getAmount();
        }

        return total;
    }
}