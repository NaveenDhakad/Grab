package com.grab.website.controller;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(HomeController.class)
class HomeControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void testHomePage() throws Exception {
        mockMvc.perform(get("/"))
                .andExpect(status().isOk())
                .andExpect(view().name("index"))
                .andExpect(model().attributeExists("services"))
                .andExpect(model().attributeExists("features"))
                .andExpect(model().attributeExists("statistics"));
    }

    @Test
    void testTransportPage() throws Exception {
        mockMvc.perform(get("/transport"))
                .andExpect(status().isOk())
                .andExpect(view().name("transport"));
    }

    @Test
    void testFoodPage() throws Exception {
        mockMvc.perform(get("/food"))
                .andExpect(status().isOk())
                .andExpect(view().name("food"));
    }
}