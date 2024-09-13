package at.Seelenkulinarik.Seelenkulinarik.DAC;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import at.Seelenkulinarik.Seelenkulinarik.Models.User;

public interface UserRepository extends JpaRepository<User, String>{
    Optional<User> findUserByName(String Name);
}
