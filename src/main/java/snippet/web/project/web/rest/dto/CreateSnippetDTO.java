package snippet.web.project.web.rest.dto;

import java.util.Date;

public class CreateSnippetDTO {

    private long id;

    private String description;

    private String clip;

    // language id saljem sa fronta
    private long language;

    private Date end_date;

    private String url;

    public CreateSnippetDTO() {
    }

    public CreateSnippetDTO(long id, String description, String clip, long language, Date end_date, String url) {
        this.id = id;
        this.description = description;
        this.clip = clip;
        this.language = language;
        this.end_date = end_date;
        this.url = url;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getClip() {
        return clip;
    }

    public void setClip(String clip) {
        this.clip = clip;
    }

    public long getLanguage() {
        return language;
    }

    public void setLanguage(long language) {
        this.language = language;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
}
