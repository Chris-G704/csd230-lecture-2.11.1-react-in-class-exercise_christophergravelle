package csd230.controllers;

import csd230.entities.MagazineEntity;
import csd230.repositories.MagazineRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/magazines")
@CrossOrigin(origins = "http://localhost:5173")
public class MagazineController {

    private final MagazineRepository magazineRepository;

    public MagazineController(MagazineRepository magazineRepository) {
        this.magazineRepository = magazineRepository;
    }

    @GetMapping
    public List<MagazineEntity> getAll() {
        return magazineRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<MagazineEntity> getById(@PathVariable Long id) {
        return magazineRepository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public MagazineEntity create(@RequestBody MagazineEntity mag) {
        return magazineRepository.save(mag);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        magazineRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}