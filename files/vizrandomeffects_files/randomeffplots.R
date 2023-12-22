setwd("files/vizrandomeffects_files")
rescov <- function(model, data) {
  var.d <- crossprod(getME(model,"Lambdat"))
  Zt <- getME(model,"Zt")
  vr <- sigma(model)^2
  var.b <- vr*(t(Zt) %*% var.d %*% Zt)
  sI <- vr * Diagonal(nrow(data))
  var.y <- var.b + sI
  return(var.y)
}

library(lme4)
data(Penicillin)

mod1 <- lmer(diameter ~ 1 + (1 | sample), data = pen_c)
rc1 <- rescov(mod1, Penicillin)
svg("../images/rc1.svg")
image(rc1)
dev.off()

mod2 <- lmer(diameter ~ 1 + (1 | sample) + (1 | plate), data = Penicillin)
rc2 <- rescov(mod2, Penicillin)
svg("../images/rc2.svg")
image(rc2)
dev.off()

svg("../images/rc2_zoom.svg")
image(rc2[1:12, 1:12])
dev.off()

data(Oxide, package = "nlme")

mod3 <- lmer(Thickness ~ 1 + (1|Lot/Wafer), data = Oxide)
rc3 <- rescov(mod3, Oxide)
svg("../images/rc3.svg")
image(rc3)
dev.off()

mod3b <- lmer(Thickness ~ 1 + (1|Lot) + (1|Wafer), data = Oxide)
rc3b <- rescov(mod3b, Oxide)
svg("../images/rc3b.svg")
image(rc3b)
dev.off()

Oxide$Wafer2 <- as.numeric(paste0(Oxide$Lot, Oxide$Wafer))

mod4 <- lmer(Thickness ~ 1 + (1|Lot/Wafer2), data = Oxide)

mod4b <- lmer(Thickness ~ 1 + (1|Lot) + (1|Wafer2), data = Oxide)
rc4b <- rescov(mod4b, Oxide)
svg("../images/rc4b.svg")
image(rc4b)
dev.off()
