package controllers;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import logics.JIRAConnectionLogic;
import logics.interfaces.JIRAExportLogic;
import models.project.Project;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;

import java.util.List;

/**
 * Created by corina on 13.05.2015.
 */
public class JIRAConnectionController extends Controller implements ExceptionHandlingInterface {
    @Inject
    private JIRAConnectionLogic jiraConnectionLogic;
    @Inject
    private JsonConverter jsonConverter;
    @Inject
    private JIRAExportLogic jiraExportLogic;

    @SubjectPresent
    @Transactional
    public Result export() {
        return catchAbstractException(request(), json -> {
            Project project = jsonConverter.getJiraProject(json);
            List<Long> qualityAttributesToExport = jsonConverter.getQualityAttributeIdsToExportFromJson(json);
            Boolean exportAsRaw = jsonConverter.getExportAsRawBoolean(json);
            return ok(Json.toJson(jiraExportLogic.exportToJira(project, qualityAttributesToExport, exportAsRaw)));
        });
    }

    @SubjectPresent
    @Transactional
    public Result getAllJIRAConnections() {
        return ok(Json.toJson(jiraConnectionLogic.getAllJIRAConnections()));
    }

    @SubjectPresent
    @Transactional
    public Result deleteJIRAConnection(Long id) {
        return catchAbstractException(id, jiraConnectionId -> {
            jiraConnectionLogic.deleteJIRAConnection(jiraConnectionId);
            return status(202);
        });
    }

    @SubjectPresent
    @Transactional
    public Result createJIRAConnection() {
        return catchAbstractException(request(), json -> ok(Json.toJson(jiraConnectionLogic.createJIRAConnection(jsonConverter.getJiraConnectionFromJson(json)))));
    }

    @SubjectPresent
    @Transactional
    public Result updateJIRAConnection() {
        return catchAbstractException(request(), json -> ok(Json.toJson(jiraConnectionLogic.updateJIRAConnection(jsonConverter.getJiraConnectionFromJson(json)))));
    }
}