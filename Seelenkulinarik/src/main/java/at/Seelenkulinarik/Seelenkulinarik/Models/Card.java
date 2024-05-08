package at.Seelenkulinarik.Seelenkulinarik.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Card {
    @Id
    @Column(nullable = false)
    private int id;

    public String Title;
    public String Body;
    public String AestheticURI;
    public String ImageURI;
}
