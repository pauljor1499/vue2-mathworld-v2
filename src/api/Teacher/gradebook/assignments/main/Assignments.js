import { Classes } from "@/api/Teacher/Data";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

var class_index = 0;

export class AssignmentService {
    get_class(class_title) {
        var index = Classes.findIndex((class_element) => class_element.title == class_title);
        if (index != -1) {
            class_index = index;
        }
    }

    get_all_assignments() {
        if (class_index > -1) {
            return Classes[class_index].assignments;
        }
    }

    get_assignment_by_code(assignment_id) {
        var assignments = Classes[class_index].assignments;
        var index = assignments.findIndex((test) => test.id == assignment_id);
        if (index > -1) {
            return assignments[index];
        }
        return null;
    }

    get_total_submissions(assignment_title) {
        var students = Classes[class_index].students;
        var counter = 0;
        students.forEach((student) => {
            student.test_scores.forEach((test) => {
                if (test.test_title == assignment_title) {
                    counter++;
                }
            });
        });
        return counter + "/" + students.length;
    }

    delete_assignment_by_code(assignment_id) {
        var assignments = Classes[class_index].assignments;
        var assignment_index = assignments.findIndex((test) => test.id === assignment_id);
        if (assignment_index > -1) {
            assignments.splice(assignment_index, 1);
            return true;
        }
        return false;
    }

    deploy_assignment(class_title, assignment_id) {
        try {
            function formatDate(date) {
                return new Date(date).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                });
            }
            var date = new Date();
            Classes.forEach((class_el) => {
                if (class_el.title == class_title) {
                    var index = class_el.assignments.findIndex((assignment) => assignment.id == assignment_id);
                    if (index > -1) {
                        class_el.assignments[index].status = "open";
                        class_el.assignments[index].date_open = formatDate(date);
                    }
                }
            });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    printToPDF(html) {
        html2canvas(html).then((canvas) => {
            const image = { type: "jpeg", quality: 0.98 };
            const margin = [0.5, 0.5];

            var imgWidth = 8.5;
            var pageHeight = 11;

            var innerPageWidth = imgWidth - margin[0] * 2;
            var innerPageHeight = pageHeight - margin[1] * 2;

            // Calculate the number of pages.
            var pxFullHeight = canvas.height;
            var pxPageHeight = Math.floor(canvas.width * (pageHeight / imgWidth));
            var nPages = Math.ceil(pxFullHeight / pxPageHeight);

            // Define pageHeight separately so it can be trimmed on the final page.
            var pageHeight = innerPageHeight;

            // Create a one-page canvas to split up the full image.
            var pageCanvas = document.createElement("canvas");
            var pageCtx = pageCanvas.getContext("2d");
            pageCanvas.width = canvas.width;
            pageCanvas.height = pxPageHeight;

            // Initialize the PDF.
            var pdf = new jsPDF("p", "in", [8.5, 11]);

            for (var page = 0; page < nPages; page++) {
                // Trim the final page to reduce file size.
                if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                    pageCanvas.height = pxFullHeight % pxPageHeight;
                    pageHeight = (pageCanvas.height * innerPageWidth) / pageCanvas.width;
                }

                // Display the page.
                var w = pageCanvas.width;
                var h = pageCanvas.height;
                pageCtx.fillStyle = "white";
                pageCtx.fillRect(0, 0, w, h);
                pageCtx.drawImage(canvas, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                // Add the page to the PDF.
                if (page > 0) {
                    pdf.addPage();
                }

                var imgData = pageCanvas.toDataURL("image/" + image.type, image.quality);
                pdf.addImage(imgData, image.type, margin[1], margin[0], innerPageWidth, pageHeight);
            }

            pdf.autoPrint();
            pdf.output("dataurlnewwindow");
            // pdf.save(filename);
        });
    }

    get_assignment(class_title, assignment_code) {
        // var class_index = Classes.findIndex((class_el) => class_el.title == class_title);
        var assignments = Classes[class_index].assignments;
        var assignment_index = assignments.findIndex((assignment) => assignment.id == assignment_code);
        return assignments[assignment_index];
    }
}
