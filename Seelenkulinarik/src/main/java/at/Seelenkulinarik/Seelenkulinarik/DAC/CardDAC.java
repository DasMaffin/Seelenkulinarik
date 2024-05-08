package at.Seelenkulinarik.Seelenkulinarik.DAC;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
    public ResponseEntity<Iterable<Card>> getAllBooks(){
        Iterable<Card> Cards = cardService.findAllCards();
        return new ResponseEntity<>(Cards, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<Card> addBook(@RequestBody Card _card){
        // _card = fillEmptyFields(_card);
        Card card = cardService.AddCard(_card);
        return new ResponseEntity<>(card, HttpStatus.OK);
    }
}
