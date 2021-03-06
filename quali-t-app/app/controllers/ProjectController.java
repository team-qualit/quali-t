package controllers;

import be.objectify.deadbolt.java.actions.Group;
import be.objectify.deadbolt.java.actions.Restrict;
import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import logics.project.ProjectLogic;
import models.project.Project;
import play.Logger;
import play.db.jpa.Transactional;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.JsonConverter;

import java.util.List;


/**
 * Created by corina on 10.04.2015.
 */
public class ProjectController extends Controller implements ExceptionHandlingInterface {
    @Inject
    private ProjectLogic projectLogic;
    @Inject
    private JsonConverter jsonConverter;

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result exportToXml(long id) {
        Logger.info("exportToXml called");
        return catchAbstractException(id, projectId -> {
            response().setContentType("application/x-download");
            response().setHeader("Content-disposition", "attachment; filename=project" + id + ".xml");
            return ok(projectLogic.exportToXML(projectId).toByteArray());
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result exportToPdf(long id) {
        Logger.info("exportToPdf called");
        return catchAbstractException(id, projectId -> {
            response().setContentType("application/x-download");
            response().setHeader("Content-disposition", "attachment; filename=project" + id + ".pdf");
            return ok(projectLogic.exportToPdf(projectId).toByteArray());
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result createProject() {
        Logger.info("createProject called");
        return catchAbstractException(request(), json -> {
            Project project = jsonConverter.getProjectFromJson(json);
            List<Long> qualityAttributeIdList = jsonConverter.getQualityAttributeIdsFromJson(json);
            List<Long> qualityPropertyIdList = jsonConverter.getQualityPropertiesFromJson(json);
            return ok(Json.toJson(projectLogic.createProject(project, qualityAttributeIdList, qualityPropertyIdList)));
        });
    }

    @SubjectPresent
    @Transactional
    public Result getAllProjects() {
        Logger.info("getAllProjects called");
        return ok(Json.toJson(projectLogic.getAllProjects()));
    }

    @SubjectPresent
    @Transactional
    public Result getProject(long id) {
        Logger.info("getProject called");
        return catchAbstractException(id, projectId -> ok(Json.toJson(projectLogic.getProject(projectId))));
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result deleteProject(Long id) {
        Logger.info("deleteProject called");
        return catchAbstractException(id, projectId -> {
            projectLogic.deleteProject(projectId);
            return status(202);
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result updateProject() {
        Logger.info("updateProject called");
        return catchAbstractException(request(), json -> {
            Project project = jsonConverter.getCompleteProjectFromJson(json);
            List<Long> qualityPropertyList = jsonConverter.getQualityPropertiesFromJson(json);
            return ok(Json.toJson(projectLogic.updateProject(project, qualityPropertyList)));
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result createInstance() {
        Logger.info("createInstance called");
        return catchAbstractException(request(), json -> {
            Project project = jsonConverter.getProjectFromJson(json);
            List<Long> qualityAttributeIdList = jsonConverter.getQualityAttributeIdsFromJson(json);
            return ok(Json.toJson(projectLogic.createInstance(project, qualityAttributeIdList)));
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result deleteInstance(Long id) {
        Logger.info("deleteInstance called");
        return catchAbstractException(id, projectId -> {
            projectLogic.deleteInstance(projectId);
            return status(202);
        });
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result updateInstance() {
        Logger.info("updateInstance called");
        return catchAbstractException(request(), json -> ok(Json.toJson(projectLogic.updateInstance(jsonConverter.getInstanceFromJson(json)))));
    }

    @Restrict({@Group("synthesizer"), @Group("admin"), @Group("evaluator"), @Group("analyst"), @Group("projectmanager")})
    @Transactional
    public Result cloneInstance(Long id) {
        Logger.info("cloneInstance called");
        return catchAbstractException(id, projectId -> ok(Json.toJson(projectLogic.cloneInstance(projectId))));
    }
}
