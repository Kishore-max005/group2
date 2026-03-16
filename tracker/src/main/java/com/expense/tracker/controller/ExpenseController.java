package com.expense.tracker.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.expense.tracker.model.Expense;
import com.expense.tracker.repository.ExpenseRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="*")
public class ExpenseController {

    @Autowired
    private ExpenseRepository repository;

    @PostMapping("/expenses")
    public Expense addExpense(@RequestBody Expense expense){
        return repository.save(expense);
    }

    @GetMapping("/expenses")
    public List<Expense> getExpenses(){
        return repository.findAll();
    }

    @PutMapping("/expenses/{id}")
    public Expense updateExpense(@PathVariable Long id,@RequestBody Expense expense){

        Expense e = repository.findById(id).get();

        e.setTitle(expense.getTitle());
        e.setAmount(expense.getAmount());
        e.setCategory(expense.getCategory());
        e.setDate(expense.getDate());

        return repository.save(e);
    }

    @DeleteMapping("/expenses/{id}")
    public void deleteExpense(@PathVariable Long id){
        repository.deleteById(id);
    }

    @GetMapping("/total")
    public double getTotal(){

        List<Expense> list = repository.findAll();

        double total = 0;

        for(Expense e : list){
            total += e.getAmount();
        }

        return total;
    }
}