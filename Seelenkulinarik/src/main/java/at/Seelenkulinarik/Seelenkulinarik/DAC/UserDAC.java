package at.Seelenkulinarik.Seelenkulinarik.DAC;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import at.Seelenkulinarik.Seelenkulinarik.Models.User;
import at.Seelenkulinarik.Seelenkulinarik.Service.UserService;

@Controller
@RequestMapping(path="/user")
public class UserDAC {
    private final UserService userService;

    public UserDAC(UserService userService){
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestParam String username, @RequestParam String password) {
        User user = userService.AddUser(new User(username, password));        
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/getUserLogin/{Name}/{Password}")
    public ResponseEntity<Boolean> deleteCard(@PathVariable("Name") String Name, @PathVariable("Password") String Password){
        User user = userService.findUserByName(Name);
        System.out.println(Password);
        System.out.println(user.Password);
        System.out.println(user.Password.equals(Password));
        if (user != null && user.Password.equals(Password)) {
            return new ResponseEntity<>(true, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.UNAUTHORIZED);
    }
}
