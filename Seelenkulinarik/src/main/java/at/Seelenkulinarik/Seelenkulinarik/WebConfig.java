package at.Seelenkulinarik.Seelenkulinarik;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @SuppressWarnings("null")
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/UserImages/**")
                .addResourceLocations("file:///C:/UserImages/");
        registry.addResourceHandler("/AssetImages/**")
                .addResourceLocations("file:///C:/AssetImages/");
    }
}
