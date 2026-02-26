package com.synchef.controller;

import com.synchef.model.Country;
import com.synchef.model.Ingredient;
import com.synchef.repository.CountryRepository;
import com.synchef.repository.IngredientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * REST controller for country and flavor map operations
 */
@RestController
@RequestMapping("/api/countries")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class CountryController {
    
    private final CountryRepository countryRepository;
    private final IngredientRepository ingredientRepository;
    
    @GetMapping
    public ResponseEntity<List<Country>> getAllCountries() {
        return ResponseEntity.ok(countryRepository.findAll());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Country> getCountryById(@PathVariable Long id) {
        return countryRepository.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/code/{code}")
    public ResponseEntity<Country> getCountryByCode(@PathVariable String code) {
        return countryRepository.findByCode(code.toUpperCase())
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/continent/{continent}")
    public ResponseEntity<List<Country>> getCountriesByContinent(@PathVariable String continent) {
        return ResponseEntity.ok(countryRepository.findByContinent(continent.toUpperCase()));
    }
    
    @GetMapping("/continents")
    public ResponseEntity<Map<String, List<Country>>> getCountriesGroupedByContinent() {
        List<Country> allCountries = countryRepository.findAll();
        Map<String, List<Country>> grouped = allCountries.stream()
            .collect(Collectors.groupingBy(Country::getContinent));
        return ResponseEntity.ok(grouped);
    }
    
    @GetMapping("/{id}/traditional-ingredients")
    public ResponseEntity<List<Ingredient>> getTraditionalIngredients(@PathVariable Long id) {
        return ResponseEntity.ok(ingredientRepository.findByCountryId(id));
    }
}
