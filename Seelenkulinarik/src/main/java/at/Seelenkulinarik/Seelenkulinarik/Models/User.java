package at.Seelenkulinarik.Seelenkulinarik.Models;

import java.io.Serializable;

import jakarta.persistence.*;

@Entity
public class User implements Serializable
{
    //#region Fields

    @Id
    @Column(nullable = false)
    public String EMail;
    public String Name;
    public String Password;

    //#endregion

    public User(){}

    public User(String _email){
        this.EMail = _email;
    }
}