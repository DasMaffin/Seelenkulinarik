package at.Seelenkulinarik.Seelenkulinarik.DAC;

import org.springframework.stereotype.Controller;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import jakarta.annotation.PostConstruct;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@Controller
@RequestMapping(path="/misc")
public class MiscDAC 
{
    private final Path fileStorageLocation;

    public MiscDAC(@Value("${file.upload-dir}") String uploadDir) {
        this.fileStorageLocation = Paths.get(uploadDir).toAbsolutePath().normalize();
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(this.fileStorageLocation);
        } catch (IOException ex) {
            throw new RuntimeException("Could not create the directory where the uploaded files will be stored.", ex);
        }
    }

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("image") MultipartFile file) {
        try {   
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty");
            }
            String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path targetLocation = this.fileStorageLocation.resolve(fileName);
            try{
                Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            }catch(IOException e){System.out.println("There may have been an issue copying the image. Probably not tho. Just windows being a nice lady with temp files...");}
            return ResponseEntity.ok(targetLocation.toString());
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Could not store file. Please try again!");
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteFile(@RequestParam("imageName") String imageName) {
        try {
            Path filePath = this.fileStorageLocation.resolve(imageName).normalize();
            Files.deleteIfExists(filePath);
            return ResponseEntity.ok("File deleted successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting file");
        }
    }

    @GetMapping("/images")
    public ResponseEntity<List<String>> getAllImages() {
        try {
            List<String> fileNames = Files.list(this.fileStorageLocation)
                    .map(path -> path.getFileName().toString())
                    .collect(Collectors.toList());

            return ResponseEntity.ok(fileNames);
        } catch (IOException ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}