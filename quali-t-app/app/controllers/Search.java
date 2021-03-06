package controllers;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import exceptions.EntityNotFoundException;
import logics.search.SearchLogic;
import models.AbstractEntity;
import play.Logger;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.ArrayList;
import java.util.HashMap;


public class Search extends Controller {
    @Inject
    private SearchLogic searchLogic;

    @SubjectPresent
    @Transactional
    public Result search(String searchArgument) throws EntityNotFoundException {
        Logger.info("search called");

        HashMap<String, ArrayList<? extends AbstractEntity>> results = searchLogic.search(searchArgument.toLowerCase());

        return ok(Json.toJson(results));
    }
}
