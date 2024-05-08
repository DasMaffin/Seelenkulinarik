package at.Seelenkulinarik.Seelenkulinarik.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import at.Seelenkulinarik.Seelenkulinarik.DAC.CardRepository;
import at.Seelenkulinarik.Seelenkulinarik.Models.Card;

@Service
public class CardService {
    private final CardRepository cardRepo;

    @Autowired
    public CardService(CardRepository _cardRepo){
        this.cardRepo = _cardRepo;
    }

    public Iterable<Card> findAllCards(){
        return cardRepo.findAll();
    }
}