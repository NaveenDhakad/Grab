package com.grab.website.model;

public class Feature {
    private String title;
    private String description;
    private String icon;

    public Feature(String title, String description, String icon) {
        this.title = title;
        this.description = description;
        this.icon = icon;
    }

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}