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

    public Card AddCard(Card card){
        return cardRepo.save(card);
    }

    public Iterable<Card> findAllCards(){
        return cardRepo.findAll();
    }

    public Card updateCard(Card card){
        return cardRepo.save(card);
    }

    public Card findCardById(int Id){
        return cardRepo.findCardById(Id).orElseThrow(); // () => CardNotFoundException("");
    }

    public void deleteCard(int Id){
        cardRepo.deleteCardById(Id);
    }
}
