package at.Seelenkulinarik.Seelenkulinarik.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Card {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    public int id;

    public String Title;
    public String Body;
    public String AestheticURI;
    public String ImageURI;
}
