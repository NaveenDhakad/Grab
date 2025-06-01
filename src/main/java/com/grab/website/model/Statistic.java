package com.grab.website.model;

public class Statistic {
    private String value;
    private String label;

    public Statistic(String value, String label) {
        this.value = value;
        this.label = label;
    }

    // Getters and Setters
    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getLabel() { return label; }
    public void setLabel(String label) { this.label = label; }
}