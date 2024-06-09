package at.Seelenkulinarik.Seelenkulinarik.DAC;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import at.Seelenkulinarik.Seelenkulinarik.Models.Card;
import at.Seelenkulinarik.Seelenkulinarik.Service.CardService;

@Controller
@RequestMapping(path="/card")
public class CardDAC {
    private final CardService cardService;
    
    public CardDAC(CardService cardService){
        this.cardService = cardService;
    }

    @GetMapping("/all")
    public ResponseEntity<Iterable<Card>> getAllCards(){
        Iterable<Card> Cards = cardService.findAllCards();
        return new ResponseEntity<>(Cards, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Card> findCardByISBN(@PathVariable("id") int Id){
        Card Card = cardService.findCardById(Id);
        return new ResponseEntity<>(Card, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Card> addCard(@RequestBody Card _card){
        Card card = cardService.AddCard(_card);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<Card> updateCard(@RequestBody Card _card){
        Card card = cardService.updateCard(_card);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCard(@PathVariable("id") int id){
        cardService.deleteCard(id); 
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
