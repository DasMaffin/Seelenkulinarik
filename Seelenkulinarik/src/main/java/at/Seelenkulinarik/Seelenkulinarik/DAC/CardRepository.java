package at.Seelenkulinarik.Seelenkulinarik.DAC;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import at.Seelenkulinarik.Seelenkulinarik.Models.Card;
import jakarta.transaction.Transactional;

public interface CardRepository extends CrudRepository<Card, String>{
    @Transactional
    void deleteCardById(int Id);

    Optional<Card> findCardById(int Id);
}
