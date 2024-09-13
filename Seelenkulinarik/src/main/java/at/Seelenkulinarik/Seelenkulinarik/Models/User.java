package at.Seelenkulinarik.Seelenkulinarik.Models;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
public class User implements Serializable
{
    //#region Fields

    @Id
    @Column(nullable = false)
    public String name;
    public String Password;

    //#endregion

    public User(){}

    public User(String Name){
        this.name = Name;
    }

    public User(String Name, String pw){
        this.name = Name;
        this.Password = pw;
    }
}