package models.project.nfritem;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import models.AbstractEntity;
import models.project.Project;
import models.project.QualityProperty;
import models.template.CatalogQA;

import javax.annotation.Nullable;
import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by corina on 03.04.2015.
 */

@Entity
@Table(name = "instance")
@Nullable
public class Instance extends AbstractEntity {

    private String description;
    @ManyToOne
    @JsonBackReference(value = "qualityAttributes")
    private Project project;
    @ManyToOne(optional = true, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JsonManagedReference("qaTemplate")
    private CatalogQA template;
    @OneToMany(mappedBy = "instance", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JsonManagedReference("qaInstanceValues")
    private Set<Val> values = new HashSet<>();
    @OneToMany(mappedBy = "qa", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE})
    @JsonManagedReference("qaStatus")
    private Set<QualityPropertyStatus> qualityPropertyStatus = new HashSet<>();

    public Instance() {
    }

    public Instance(String description, CatalogQA qa) {
        this.description = description;
        this.template = qa;
    }

    public void addQualityProperty(Collection<QualityProperty> qps) {
        for (QualityProperty qp : qps) {
            qualityPropertyStatus.add(new QualityPropertyStatus(this, qp));
        }
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public CatalogQA getTemplate() {
        return template;
    }

    public void setTemplate(CatalogQA template) {
        this.template = template;
    }

    public Set<Val> getValues() {
        return values;
    }

    public void setValues(Set<Val> values) {
        this.values = values;
    }

    public Set<QualityPropertyStatus> getQualityPropertyStatus() {
        return qualityPropertyStatus;
    }

    public void setQualityPropertyStatus(Set<QualityPropertyStatus> qualityPropertyStatus) {
        this.qualityPropertyStatus = qualityPropertyStatus;
    }

    public void addValue(Val val) {
        this.values.add(val);
        val.setInstance(this);
    }
}
