setwd("files/images/")
par(oma = c(0,0,0,0), mar = c(0,0,0,0))

png("../images/mediation.png")
plot.new()
scale <- c(20, 4, 6)
names(scale) <- c("point", "text", "arrow")

x <- c(.11, .89)
y <- c(.87, .87)
points(x[1], y[1], cex = scale["point"])
points(x[2], y[2], cex = scale["point"])
text(x[1], y[1], "X", cex = scale["text"])
text(x[2], y[2], "Y", cex = scale["text"])
arrows(x[1] + .18, y[1],
       x[2] - .18, y[2], lwd = scale["arrow"])
text(.5, y[2] + .06, "c", cex = scale["text"])

x <- c(.11, .5, .89)
y <- c(.15, .6, .15)

points(x[1], y[1], cex = scale["point"])
points(x[2], y[2], cex = scale["point"])
points(x[3], y[3], cex = scale["point"])
text(x[1], y[1], "X", cex = scale["text"])
text(x[2], y[2], "Z", cex = scale["text"])
text(x[3], y[3], "Y", cex = scale["text"])
arrows(x[1] + .13, y[1] + .13,
       x[2] - .11, y[2] - .14, lwd = scale["arrow"])
arrows(x[1] + .17, y[1],
       x[3] - .17, y[3], lwd = scale["arrow"])
arrows(x[2] + .13, y[2] - .13,
       x[3] - .11, y[3] + .14, lwd = scale["arrow"])
text(.5, y[1] + .07, "d", cex = scale["text"])
text(mean(x[1:2]) - .05, mean(y[1:2]) + .05, "a", cex = scale["text"])
text(mean(x[2:3]) + .05, mean(y[1:2]) + .07, "b", cex = scale["text"])
dev.off()
