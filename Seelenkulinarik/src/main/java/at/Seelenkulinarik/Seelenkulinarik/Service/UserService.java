package at.Seelenkulinarik.Seelenkulinarik.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import at.Seelenkulinarik.Seelenkulinarik.DAC.UserRepository;
import at.Seelenkulinarik.Seelenkulinarik.Models.User;

@Service
public class UserService {
    private final UserRepository userRepo;

    @Autowired
    public UserService(UserRepository _userRepo){
        this.userRepo = _userRepo;
    }

    public User findUserByName(String Name){
        return userRepo.findUserByName(Name).orElseThrow(); // () => CardNotFoundException("");
    }
    
    public User AddUser(User user){
        return userRepo.save(user);
    }

    public boolean checkPassword(String givenPass, String userPass){
        return givenPass == userPass;
    }
}
